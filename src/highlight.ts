import { styleTags, tags as t } from "@lezer/highlight";

export const templateJsonHighlighting = styleTags({
  String: t.string,
  Number: t.number,
  "True False": t.bool,
  PropertyName: t.propertyName,
  Null: t.null,
  VarOpen: t.special(t.variableName),
  Variable: t.variableName,
  VarClose: t.special(t.variableName),
  ", :": t.separator,
  "[ ]": t.squareBracket,
  "{ }": t.brace,
});
