import {
  NameType,
  ValueType,
} from "recharts/types/component/DefaultTooltipContent";

export type TooltipFormatter = (
  value: ValueType,
  name: NameType,
) => [string, string];
