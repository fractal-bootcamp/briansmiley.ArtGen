import { ColorBlockParams } from "@/services/ArtBlock.types";
import ColorBlockControls from "./ColorBlockControls";
import ColorBlock from "./ColorBlock";
import { BlockInterface } from "../Block.types";

type BlockProps = ColorBlockParams;
type Block = BlockInterface<"color", BlockProps>;

const color: Block = {
  artType: "color",
  Control: ColorBlockControls,
  Display: ColorBlock
};

export default color;