import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

export function SwitchComponent({
  isChecked,
  idText,
  labelText,
  onChange,
  isDisabled,
}: {
  isChecked: boolean;
  idText: string;
  labelText: string;
  isDisabled?: boolean;
  onChange: () => void;
}) {
  return (
    <div className="flex items-center space-x-2">
      <Switch
        id={idText}
        checked={isChecked}
        onCheckedChange={onChange}
        disabled={isDisabled}
      />
      <Label htmlFor={idText}>{labelText}</Label>
    </div>
  );
}
