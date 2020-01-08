// Compiled using marko@4.18.29 - DO NOT EDIT
"use strict";

var marko_template = module.exports = require("marko/src/html").t(__filename),
    marko_componentType = "/node_estudos$1.0.0/src/app/views/livros/form/form.marko",
    marko_renderer = require("marko/src/runtime/components/renderer"),
    marko_loadTag = require("marko/src/runtime/helpers/load-tag"),
    component_globals_tag = marko_loadTag(require("marko/src/core-tags/components/component-globals-tag")),
    init_components_tag = marko_loadTag(require("marko/src/core-tags/components/init-components-tag")),
    await_reorderer_tag = marko_loadTag(require("marko/src/core-tags/core/await/reorderer-renderer"));

function render(input, out, __component, component, state) {
  var data = input;

  out.w("<!DOCTYPE html><html lang=\"en\"><head><meta charset=\"UTF-8\"><meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\"><meta http-equiv=\"X-UA-Compatible\" content=\"ie=edge\"><title>Form de livros</title></head><body>");

  component_globals_tag({}, out);

  out.w("<form action=\"/livros\" method=\"post\"><input type=\"hidden\" id=\"id\" name=\"id\"><div><label for=\"titulo\">Titulo:</label><input type=\"text\" name=\"titulo\" placeholder=\"Nome\" id=\"titulo\"></div><div><label for=\"preco\">Preço:</label><input type=\"text\" name=\"preco\" placeholder=\"150.00\" id=\"preco\"></div><div><label for=\"descricao\">Descrição:</label><textarea cols=\"20\" rows=\"10\" name=\"descricao\" placeholder=\"Descrição\" id=\"descricao\"></textarea></div><input type=\"submit\" value=\"Salvar\"></form>");

  init_components_tag({}, out);

  await_reorderer_tag({}, out, __component, "19");

  out.w("</body></html>");
}

marko_template._ = marko_renderer(render, {
    ___implicit: true,
    ___type: marko_componentType
  });

marko_template.meta = {
    id: "/node_estudos$1.0.0/src/app/views/livros/form/form.marko",
    tags: [
      "marko/src/core-tags/components/component-globals-tag",
      "marko/src/core-tags/components/init-components-tag",
      "marko/src/core-tags/core/await/reorderer-renderer"
    ]
  };
