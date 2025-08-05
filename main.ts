import { LRLanguage } from "@codemirror/language";
import { EditorView } from "@codemirror/view";
import { basicSetup } from "codemirror";
import { parser } from "./src/index.ts";

const templateJsonLanguage = LRLanguage.define({
  parser,
  languageData: { name: "template-json" },
});

new EditorView({
  doc: `{
    "name": {{name}},
    "age": {{age}},
    "nested": {
      "value": {{value}}
    }
  }`,
  parent: document.body,
  extensions: [basicSetup, templateJsonLanguage],
});
