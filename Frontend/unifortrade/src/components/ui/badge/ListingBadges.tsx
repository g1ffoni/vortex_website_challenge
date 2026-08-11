import type {
  ListingResponseType,
  ListingResponseStatus,
} from "@/lib/api/generated/models";
import Badge, { type BadgeTone } from "./Badge";

const STATUS_LABEL: Record<ListingResponseStatus, string> = {
  ACTIVE: "Available",
  CLAIMED: "Reserved",
  COMPLETED: "Completed",
};

const STATUS_TONE: Record<ListingResponseStatus, BadgeTone> = {
  ACTIVE: "success",
  CLAIMED: "warning",
  COMPLETED: "neutral",
};

export function ListingStatusBadge({ status }: { status?: ListingResponseStatus }) {
  if (!status) return null;
  return <Badge tone={STATUS_TONE[status]}>{STATUS_LABEL[status]}</Badge>;
}

const TYPE_LABEL: Record<ListingResponseType, string> = {
  SALE: "For sale",
  DONATION: "Donation",
};

const TYPE_TONE: Record<ListingResponseType, BadgeTone> = {
  SALE: "information",
  DONATION: "accent",
};

export function ListingTypeBadge({ type }: { type?: ListingResponseType }) {
  if (!type) return null;
  return <Badge tone={TYPE_TONE[type]}>{TYPE_LABEL[type]}</Badge>;
}
