import type { MintingRequestDTO } from "@/types";

export interface GetMintStatusDTO extends MintingRequestDTO {
  PolicyId: string | null;
  Status: string | null;
  TxHash: string | null;
}
