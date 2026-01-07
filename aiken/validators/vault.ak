use aiken/collection/list
use cardano/assets.{AssetName, PolicyId}
use cardano/transaction.{Output, OutputReference, Transaction}

// Same datum type
pub type VaultDatum {
  parts: Int,
}

pub type VaultAction {
  Combine
}

fn qty(v: assets.Value, pid: PolicyId, an: AssetName) -> Int {
  assets.quantity_of(v, pid, an)
}

fn has_token(v: assets.Value, pid: PolicyId, an: AssetName) -> Bool {
  qty(v, pid, an) != 0
}

fn no_outputs_have_token(
  self: Transaction,
  pid: PolicyId,
  an: AssetName,
) -> Bool {
  self.outputs |> list.all(fn(o) { qty(o.value, pid, an) == 0 })
}

// Ensure NFT is paid to some output that is NOT the continuing STT vault output
fn nft_is_paid_out(
  self: Transaction,
  stt_pid: PolicyId,
  stt_name: AssetName,
  nft_pid: PolicyId,
  nft_name: AssetName,
) -> Bool {
  self.outputs
    |> list.any(
        fn(o) {
          has_token(o.value, nft_pid, nft_name) && // do not allow “keeping it in the vault” (anything still tagged with STT)
          !has_token(o.value, stt_pid, stt_name)
        },
      )
}

validator vault(
  stt_pid: PolicyId,
  stt_name: AssetName,
  frac_pid: PolicyId,
  frac_name: AssetName,
  nft_pid: PolicyId,
  nft_name: AssetName,
) {
  spend(
    datum_opt: Option<VaultDatum>,
    redeemer: VaultAction,
    own_ref: OutputReference,
    self: Transaction,
  ) {
    // Ensure we’re spending the correct UTxO (standard)
    expect self.inputs |> list.any(fn(i) { i.output_reference == own_ref })

    // Must have inline datum (parts)
    expect Some(vd) = datum_opt
    let parts = vd.parts

    // Require STT and NFT are present in the consumed vault input
    let consumed =
      self.inputs
        |> list.filter(fn(i) { i.output_reference == own_ref })

    expect [vin] = consumed
    expect has_token(vin.output.value, stt_pid, stt_name)
    expect has_token(vin.output.value, nft_pid, nft_name)

    expect no_outputs_have_token(self, frac_pid, frac_name)
    expect no_outputs_have_token(self, stt_pid, stt_name)

    expect redeemer == Combine

    // Burn exact fractions & burn STT
    expect qty(self.mint, frac_pid, frac_name) == -parts
    expect qty(self.mint, stt_pid, stt_name) == -1

    // NFT must be paid out somewhere not tagged by STT
    nft_is_paid_out(self, stt_pid, stt_name, nft_pid, nft_name)
  }

  else(_) {
    fail
  }
}
