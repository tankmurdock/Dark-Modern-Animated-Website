import Bounded from "@/components/Bounded";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import StarBackground from "./StarBackground";
import background from "./background.jpg";
import Image from "next/image";
/**
 * Props for `Integrations`.
 */
export type IntegrationsProps = SliceComponentProps<Content.IntegrationsSlice>;

/**
 * Component for "Integrations" Slices.
 */
const Integrations = ({ slice }: IntegrationsProps): JSX.Element => {
  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="relative overflow-hidden"
    >
      <Image
        src={background}
        alt=""
        fill
        className="object-cover"
        quality={90}
      />
      <StarBackground />
    </Bounded>
  );
};

export default Integrations;
