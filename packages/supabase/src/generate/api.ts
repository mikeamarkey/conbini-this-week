/**
 * This file was auto-generated by openapi-typescript.
 * Do not make direct changes to the file.
 */

export interface paths {
  "/": {
    get: {
      responses: {
        /** OK */
        200: unknown;
      };
    };
  };
  "/items": {
    get: {
      parameters: {
        query: {
          id?: parameters["rowFilter.items.id"];
          /** enum conbini name as public.conbini */
          conbini?: parameters["rowFilter.items.conbini"];
          url?: parameters["rowFilter.items.url"];
          title?: parameters["rowFilter.items.title"];
          img?: parameters["rowFilter.items.img"];
          created_at?: parameters["rowFilter.items.created_at"];
          price?: parameters["rowFilter.items.price"];
          category?: parameters["rowFilter.items.category"];
          /** Filtering Columns */
          select?: parameters["select"];
          /** Ordering */
          order?: parameters["order"];
          /** Limiting and Pagination */
          offset?: parameters["offset"];
          /** Limiting and Pagination */
          limit?: parameters["limit"];
        };
        header: {
          /** Limiting and Pagination */
          Range?: parameters["range"];
          /** Limiting and Pagination */
          "Range-Unit"?: parameters["rangeUnit"];
          /** Preference */
          Prefer?: parameters["preferCount"];
        };
      };
      responses: {
        /** OK */
        200: {
          schema: definitions["items"][];
        };
        /** Partial Content */
        206: unknown;
      };
    };
    post: {
      parameters: {
        body: {
          /** items */
          items?: definitions["items"];
        };
        query: {
          /** Filtering Columns */
          select?: parameters["select"];
        };
        header: {
          /** Preference */
          Prefer?: parameters["preferReturn"];
        };
      };
      responses: {
        /** Created */
        201: unknown;
      };
    };
    delete: {
      parameters: {
        query: {
          id?: parameters["rowFilter.items.id"];
          /** enum conbini name as public.conbini */
          conbini?: parameters["rowFilter.items.conbini"];
          url?: parameters["rowFilter.items.url"];
          title?: parameters["rowFilter.items.title"];
          img?: parameters["rowFilter.items.img"];
          created_at?: parameters["rowFilter.items.created_at"];
          price?: parameters["rowFilter.items.price"];
          category?: parameters["rowFilter.items.category"];
        };
        header: {
          /** Preference */
          Prefer?: parameters["preferReturn"];
        };
      };
      responses: {
        /** No Content */
        204: never;
      };
    };
    patch: {
      parameters: {
        query: {
          id?: parameters["rowFilter.items.id"];
          /** enum conbini name as public.conbini */
          conbini?: parameters["rowFilter.items.conbini"];
          url?: parameters["rowFilter.items.url"];
          title?: parameters["rowFilter.items.title"];
          img?: parameters["rowFilter.items.img"];
          created_at?: parameters["rowFilter.items.created_at"];
          price?: parameters["rowFilter.items.price"];
          category?: parameters["rowFilter.items.category"];
        };
        body: {
          /** items */
          items?: definitions["items"];
        };
        header: {
          /** Preference */
          Prefer?: parameters["preferReturn"];
        };
      };
      responses: {
        /** No Content */
        204: never;
      };
    };
  };
}

export interface definitions {
  /** conbini items */
  items: {
    /**
     * Note:
     * This is a Primary Key.<pk/>
     */
    id: number;
    /** enum conbini name as public.conbini */
    conbini: "familymart" | "lawson" | "seveneleven";
    url: string;
    title: string;
    img: string;
    created_at: string;
    price: number;
    category?: string;
  };
}

export interface parameters {
  /** Preference */
  preferParams: "params=single-object";
  /** Preference */
  preferReturn: "return=representation" | "return=minimal" | "return=none";
  /** Preference */
  preferCount: "count=none";
  /** Filtering Columns */
  select: string;
  /** On Conflict */
  on_conflict: string;
  /** Ordering */
  order: string;
  /** Limiting and Pagination */
  range: string;
  /** Limiting and Pagination */
  rangeUnit: string;
  /** Limiting and Pagination */
  offset: string;
  /** Limiting and Pagination */
  limit: string;
  /** items */
  "body.items": definitions["items"];
  "rowFilter.items.id": string;
  /** enum conbini name as public.conbini */
  "rowFilter.items.conbini": string;
  "rowFilter.items.url": string;
  "rowFilter.items.title": string;
  "rowFilter.items.img": string;
  "rowFilter.items.created_at": string;
  "rowFilter.items.price": string;
  "rowFilter.items.category": string;
}

export interface operations {}

export interface external {}
