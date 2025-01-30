import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

export function SwitchComponent({
  userPermitted,
  idText,
  labelText,
  onChange,
}: {
  userPermitted: boolean;
  idText: string;
  labelText: string;
  onChange: () => void;
}) {
  return (
    <div className="flex items-center space-x-2">
      <Switch id={idText} checked={userPermitted} onCheckedChange={onChange} />
      <Label htmlFor={idText}>{labelText}</Label>
    </div>
  );
}
