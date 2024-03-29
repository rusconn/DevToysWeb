import { Button, ButtonProps } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

export type BaseProps = ButtonProps & {
  icon: React.ReactNode;
  iconOnly?: true;
  labelText: string;
};

export function Base({ icon, iconOnly, labelText, ...props }: BaseProps) {
  const button = (
    <Button className="inline-flex items-center border" {...props}>
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
