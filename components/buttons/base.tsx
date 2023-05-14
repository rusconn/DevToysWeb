import { Button, ButtonProps } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

export type BaseButtonProps = ButtonProps & {
  icon: React.ReactNode;
  iconOnly?: true;
  labelText: string;
};

export function BaseButton({ icon, iconOnly, labelText, ...props }: BaseButtonProps) {
  const button = (
    <Button className="w-fit border" {...props}>
      {icon}
      {!iconOnly && <span className="ml-1">{labelText}</span>}
    </Button>
  );

  return iconOnly ? (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>{button}</TooltipTrigger>
        <TooltipContent>
          <p>{labelText}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  ) : (
    button
  );
}
