import { styleTags, tags as t } from "@lezer/highlight";

export const templateJsonHighlighting = styleTags({
  String: t.string,
  Number: t.number,
  "True False": t.bool,
  PropertyName: t.propertyName,
  Null: t.null,
  VarOpen: t.special(t.brace),
  Variable: t.variableName,
  VarClose: t.special(t.brace),
  ", :": t.separator,
  "[ ]": t.squareBracket,
  "{ }": t.brace,
});
