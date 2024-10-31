import { Button } from "@/components/ui/button";

export const BarButton = (
  props: React.HTMLAttributes<HTMLButtonElement> & {
    icon: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
    text: string;
  }
) => {
  const { icon, text, ...rest } = props;
  return (
    <Button
      variant={"outline"}
      className="hidden md:flex gap-2 px-4  "
      size={"default"}
      {...rest}
    >
      <span className="  rounded-lg bg-accent p-2">
        <props.icon height={13} width={13} />
      </span>
      {props.text}
    </Button>
  );
};
