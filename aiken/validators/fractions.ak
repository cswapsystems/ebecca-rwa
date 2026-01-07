use aiken/collection/list
use cardano/assets.{AssetName, PolicyId}
use cardano/transaction.{InlineDatum, Output, Transaction}

// Datum on the vault output/input
pub type VaultDatum {
  parts: Int,
}

// Mint redeemers
pub type FractionAction {
  Init { parts: Int }
  Combine
}

fn qty(v: assets.Value, pid: PolicyId, an: AssetName) -> Int {
  assets.quantity_of(v, pid, an)
}

fn has_token(v: assets.Value, pid: PolicyId, an: AssetName) -> Bool {
  qty(v, pid, an) != 0
}

fn parts_ok(parts: Int, max_parts: Int) -> Bool {
  parts > 1 && parts <= max_parts
}

fn inline_vault_datum(o: Output) -> Option<VaultDatum> {
  when o.datum is {
    InlineDatum(d) -> {
      // FIX: cast Data -> VaultDatum
      expect vd: VaultDatum = d
      Some(vd)
    }
    _ -> None
  }
}

fn any_output_matches_vault(
  self: Transaction,
  stt_pid: PolicyId,
  stt_name: AssetName,
  nft_pid: PolicyId,
  nft_name: AssetName,
  parts: Int,
) -> Bool {
  self.outputs
    |> list.any(
        fn(o) {
          has_token(o.value, stt_pid, stt_name) && has_token(
            o.value,
            nft_pid,
            nft_name,
          ) && when inline_vault_datum(o) is {
            Some(vd) -> vd.parts == parts
            None -> False
          }
        },
      )
}

validator fractions(
  stt_pid: PolicyId,
  stt_name: AssetName,
  nft_pid: PolicyId,
  nft_name: AssetName,
  frac_name: AssetName,
  max_parts: Int,
) {
  mint(redeemer: FractionAction, frac_pid: PolicyId, self: Transaction) {
    let m_frac = qty(self.mint, frac_pid, frac_name)
    let m_stt = qty(self.mint, stt_pid, stt_name)

    when redeemer is {
      Init { parts } -> {
        expect parts_ok(parts, max_parts)

        // Mint exact fractions
        expect m_frac == parts

        // Require STT minted in same tx (+1)
        expect m_stt == 1

        // Require a vault output exists that holds STT + locked NFT + datum(parts)
        any_output_matches_vault(
          self,
          stt_pid,
          stt_name,
          nft_pid,
          nft_name,
          parts,
        )
      }

      Combine -> {
        let vault_inputs =
          self.inputs
            |> list.filter(
                fn(i) {
                  has_token(i.output.value, stt_pid, stt_name) && when
                    i.output.datum
                  is {
                    InlineDatum(_) -> True
                    _ -> False
                  }
                },
              )

        expect [vin] = vault_inputs
        expect InlineDatum(d) = vin.output.datum

        // FIX: remove from_data, cast directly
        expect vd: VaultDatum = d
        let parts = vd.parts

        // Burn exact fractions and burn STT
        expect m_frac == -parts
        expect m_stt == -1

        True
      }
    }
  }

  else(_) {
    fail
  }
}
