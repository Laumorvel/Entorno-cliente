// To parse this data:
//
//   import { Convert, Welcome } from "./file";
//
//   const welcome = Convert.toWelcome(json);
//
// These functions will throw an error if the JSON doesn't
// match the expected interface, even if the JSON is valid.

export interface Welcome {
  numFound:      number;
  start:         number;
  numFoundExact: boolean;
  docs:          Doc[];
  num_found:     number;
  q:             string;
  offset:        null;
}

export interface Doc {
  key:                      string;
  type:                     Type;
  seed:                     string[];
  title:                    string;
  title_suggest:            string;
  has_fulltext:             boolean;
  edition_count:            number;
  edition_key:              string[];
  publish_date:             string[];
  publish_year:             number[];
  first_publish_year:       number;
  isbn?:                    string[];
  last_modified_i:          number;
  ebook_count_i:            number;
  publisher:                string[];
  language:                 string[];
  author_key:               string[];
  author_name:              string[];
  publisher_facet:          string[];
  _version_:                number;
  author_facet:             string[];
  number_of_pages_median?:  number;
  lccn?:                    string[];
  publish_place?:           string[];
  oclc?:                    string[];
  contributor?:             string[];
  lcc?:                     string[];
  ddc?:                     string[];
  ia?:                      string[];
  public_scan_b?:           boolean;
  ia_collection_s?:         string;
  lending_edition_s?:       string;
  lending_identifier_s?:    string;
  printdisabled_s?:         string;
  cover_edition_key?:       string;
  cover_i?:                 number;
  author_alternative_name?: string[];
  place?:                   string[];
  subject?:                 string[];
  id_amazon?:               string[];
  id_goodreads?:            string[];
  id_librarything?:         string[];
  ia_loaded_id?:            string[];
  ia_box_id?:               string[];
  place_key?:               string[];
  subject_facet?:           string[];
  place_facet?:             string[];
  lcc_sort?:                string;
  subject_key?:             string[];
  ddc_sort?:                string;
  first_sentence?:          string[];
  person?:                  string[];
  id_overdrive?:            string[];
  person_key?:              string[];
  person_facet?:            string[];
}

export enum Type {
  Work = "work",
}

// Converts JSON strings to/from your types
// and asserts the results of JSON.parse at runtime
export class Convert {
  public static toWelcome(json: string): Welcome {
      return cast(JSON.parse(json), r("Welcome"));
  }

  public static welcomeToJson(value: Welcome): string {
      return JSON.stringify(uncast(value, r("Welcome")), null, 2);
  }
}

function invalidValue(typ: any, val: any, key: any = ''): never {
  if (key) {
      throw Error(`Invalid value for key "${key}". Expected type ${JSON.stringify(typ)} but got ${JSON.stringify(val)}`);
  }
  throw Error(`Invalid value ${JSON.stringify(val)} for type ${JSON.stringify(typ)}`, );
}

function jsonToJSProps(typ: any): any {
  if (typ.jsonToJS === undefined) {
      const map: any = {};
      typ.props.forEach((p: any) => map[p.json] = { key: p.js, typ: p.typ });
      typ.jsonToJS = map;
  }
  return typ.jsonToJS;
}

function jsToJSONProps(typ: any): any {
  if (typ.jsToJSON === undefined) {
      const map: any = {};
      typ.props.forEach((p: any) => map[p.js] = { key: p.json, typ: p.typ });
      typ.jsToJSON = map;
  }
  return typ.jsToJSON;
}

function transform(val: any, typ: any, getProps: any, key: any = ''): any {
  function transformPrimitive(typ: string, val: any): any {
      if (typeof typ === typeof val) return val;
      return invalidValue(typ, val, key);
  }

  function transformUnion(typs: any[], val: any): any {
      // val must validate against one typ in typs
      const l = typs.length;
      for (let i = 0; i < l; i++) {
          const typ = typs[i];
          try {
              return transform(val, typ, getProps);
          } catch (_) {}
      }
      return invalidValue(typs, val);
  }

  function transformEnum(cases: string[], val: any): any {
      if (cases.indexOf(val) !== -1) return val;
      return invalidValue(cases, val);
  }

  function transformArray(typ: any, val: any): any {
      // val must be an array with no invalid elements
      if (!Array.isArray(val)) return invalidValue("array", val);
      return val.map(el => transform(el, typ, getProps));
  }

  function transformDate(val: any): any {
      if (val === null) {
          return null;
      }
      const d = new Date(val);
      if (isNaN(d.valueOf())) {
          return invalidValue("Date", val);
      }
      return d;
  }

  function transformObject(props: { [k: string]: any }, additional: any, val: any): any {
      if (val === null || typeof val !== "object" || Array.isArray(val)) {
          return invalidValue("object", val);
      }
      const result: any = {};
      Object.getOwnPropertyNames(props).forEach(key => {
          const prop = props[key];
          const v = Object.prototype.hasOwnProperty.call(val, key) ? val[key] : undefined;
          result[prop.key] = transform(v, prop.typ, getProps, prop.key);
      });
      Object.getOwnPropertyNames(val).forEach(key => {
          if (!Object.prototype.hasOwnProperty.call(props, key)) {
              result[key] = transform(val[key], additional, getProps, key);
          }
      });
      return result;
  }

  if (typ === "any") return val;
  if (typ === null) {
      if (val === null) return val;
      return invalidValue(typ, val);
  }
  if (typ === false) return invalidValue(typ, val);
  while (typeof typ === "object" && typ.ref !== undefined) {
      typ = typeMap[typ.ref];
  }
  if (Array.isArray(typ)) return transformEnum(typ, val);
  if (typeof typ === "object") {
      return typ.hasOwnProperty("unionMembers") ? transformUnion(typ.unionMembers, val)
          : typ.hasOwnProperty("arrayItems")    ? transformArray(typ.arrayItems, val)
          : typ.hasOwnProperty("props")         ? transformObject(getProps(typ), typ.additional, val)
          : invalidValue(typ, val);
  }
  // Numbers can be parsed by Date but shouldn't be.
  if (typ === Date && typeof val !== "number") return transformDate(val);
  return transformPrimitive(typ, val);
}

function cast<T>(val: any, typ: any): T {
  return transform(val, typ, jsonToJSProps);
}

function uncast<T>(val: T, typ: any): any {
  return transform(val, typ, jsToJSONProps);
}

function a(typ: any) {
  return { arrayItems: typ };
}

function u(...typs: any[]) {
  return { unionMembers: typs };
}

function o(props: any[], additional: any) {
  return { props, additional };
}

function m(additional: any) {
  return { props: [], additional };
}

function r(name: string) {
  return { ref: name };
}

const typeMap: any = {
  "Welcome": o([
      { json: "numFound", js: "numFound", typ: 0 },
      { json: "start", js: "start", typ: 0 },
      { json: "numFoundExact", js: "numFoundExact", typ: true },
      { json: "docs", js: "docs", typ: a(r("Doc")) },
      { json: "num_found", js: "num_found", typ: 0 },
      { json: "q", js: "q", typ: "" },
      { json: "offset", js: "offset", typ: null },
  ], false),
  "Doc": o([
      { json: "key", js: "key", typ: "" },
      { json: "type", js: "type", typ: r("Type") },
      { json: "seed", js: "seed", typ: a("") },
      { json: "title", js: "title", typ: "" },
      { json: "title_suggest", js: "title_suggest", typ: "" },
      { json: "has_fulltext", js: "has_fulltext", typ: true },
      { json: "edition_count", js: "edition_count", typ: 0 },
      { json: "edition_key", js: "edition_key", typ: a("") },
      { json: "publish_date", js: "publish_date", typ: a("") },
      { json: "publish_year", js: "publish_year", typ: a(0) },
      { json: "first_publish_year", js: "first_publish_year", typ: 0 },
      { json: "isbn", js: "isbn", typ: u(undefined, a("")) },
      { json: "last_modified_i", js: "last_modified_i", typ: 0 },
      { json: "ebook_count_i", js: "ebook_count_i", typ: 0 },
      { json: "publisher", js: "publisher", typ: a("") },
      { json: "language", js: "language", typ: a("") },
      { json: "author_key", js: "author_key", typ: a("") },
      { json: "author_name", js: "author_name", typ: a("") },
      { json: "publisher_facet", js: "publisher_facet", typ: a("") },
      { json: "_version_", js: "_version_", typ: 3.14 },
      { json: "author_facet", js: "author_facet", typ: a("") },
      { json: "number_of_pages_median", js: "number_of_pages_median", typ: u(undefined, 0) },
      { json: "lccn", js: "lccn", typ: u(undefined, a("")) },
      { json: "publish_place", js: "publish_place", typ: u(undefined, a("")) },
      { json: "oclc", js: "oclc", typ: u(undefined, a("")) },
      { json: "contributor", js: "contributor", typ: u(undefined, a("")) },
      { json: "lcc", js: "lcc", typ: u(undefined, a("")) },
      { json: "ddc", js: "ddc", typ: u(undefined, a("")) },
      { json: "ia", js: "ia", typ: u(undefined, a("")) },
      { json: "public_scan_b", js: "public_scan_b", typ: u(undefined, true) },
      { json: "ia_collection_s", js: "ia_collection_s", typ: u(undefined, "") },
      { json: "lending_edition_s", js: "lending_edition_s", typ: u(undefined, "") },
      { json: "lending_identifier_s", js: "lending_identifier_s", typ: u(undefined, "") },
      { json: "printdisabled_s", js: "printdisabled_s", typ: u(undefined, "") },
      { json: "cover_edition_key", js: "cover_edition_key", typ: u(undefined, "") },
      { json: "cover_i", js: "cover_i", typ: u(undefined, 0) },
      { json: "author_alternative_name", js: "author_alternative_name", typ: u(undefined, a("")) },
      { json: "place", js: "place", typ: u(undefined, a("")) },
      { json: "subject", js: "subject", typ: u(undefined, a("")) },
      { json: "id_amazon", js: "id_amazon", typ: u(undefined, a("")) },
      { json: "id_goodreads", js: "id_goodreads", typ: u(undefined, a("")) },
      { json: "id_librarything", js: "id_librarything", typ: u(undefined, a("")) },
      { json: "ia_loaded_id", js: "ia_loaded_id", typ: u(undefined, a("")) },
      { json: "ia_box_id", js: "ia_box_id", typ: u(undefined, a("")) },
      { json: "place_key", js: "place_key", typ: u(undefined, a("")) },
      { json: "subject_facet", js: "subject_facet", typ: u(undefined, a("")) },
      { json: "place_facet", js: "place_facet", typ: u(undefined, a("")) },
      { json: "lcc_sort", js: "lcc_sort", typ: u(undefined, "") },
      { json: "subject_key", js: "subject_key", typ: u(undefined, a("")) },
      { json: "ddc_sort", js: "ddc_sort", typ: u(undefined, "") },
      { json: "first_sentence", js: "first_sentence", typ: u(undefined, a("")) },
      { json: "person", js: "person", typ: u(undefined, a("")) },
      { json: "id_overdrive", js: "id_overdrive", typ: u(undefined, a("")) },
      { json: "person_key", js: "person_key", typ: u(undefined, a("")) },
      { json: "person_facet", js: "person_facet", typ: u(undefined, a("")) },
  ], false),
  "Type": [
      "work",
  ],
};
