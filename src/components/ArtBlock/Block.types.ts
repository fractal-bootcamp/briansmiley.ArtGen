type ControlProps<AT, S> = {
  artParams: { artType: AT } & S;
  setParams: (params: { artType: AT } & S) => void;
};
type DisplayProps<AT, S> = { artType: AT } & S;

export type BlockInterface<AT, SpecificArtBlockProps> = {
  Control: React.FC<ControlProps<AT, SpecificArtBlockProps>>;
  Display: React.FC<DisplayProps<AT, SpecificArtBlockProps>>;
  artType: AT;
};