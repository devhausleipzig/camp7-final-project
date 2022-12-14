// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.
// This file will be automatically regenerated when your Next.js server is running.
/* eslint-disable */

// prettier-ignore
declare module "nextjs-routes" {
  export type Route =
    | { pathname: "/api/action/[userId]"; query: Query<{ "userId": string }> }
    | { pathname: "/api/auth/login"; query?: Query | undefined }
    | { pathname: "/api/auth/register"; query?: Query | undefined }
    | { pathname: "/api/auth/test"; query?: Query | undefined }
    | { pathname: "/api/chat/[chatId]"; query: Query<{ "chatId": string }> }
    | { pathname: "/api/chat/chat"; query?: Query | undefined }
    | { pathname: "/api/chat"; query?: Query | undefined }
    | { pathname: "/api/user/[userId]"; query: Query<{ "userId": string }> }
    | { pathname: "/api/user/images"; query?: Query | undefined }
    | { pathname: "/api/user"; query?: Query | undefined }
    | { pathname: "/api/user/inputFields"; query?: Query | undefined }
    | { pathname: "/api/user/match"; query?: Query | undefined }
    | { pathname: "/api/user/matches"; query?: Query | undefined }
    | { pathname: "/api/user/me"; query?: Query | undefined }
    | { pathname: "/api/user/test"; query?: Query | undefined }
    | { pathname: "/cards"; query?: Query | undefined }
    | { pathname: "/chat/[chat_id]"; query: Query<{ "chat_id": string }> }
    | { pathname: "/chat"; query?: Query | undefined }
    | { pathname: "/chat/profile/[userId]"; query: Query<{ "userId": string }> }
    | { pathname: "/editProfile"; query?: Query | undefined }
    | { pathname: "/"; query?: Query | undefined }
    | { pathname: "/login"; query?: Query | undefined }
    | { pathname: "/matches"; query?: Query | undefined }
    | { pathname: "/register"; query?: Query | undefined }
    | { pathname: "/registration1"; query?: Query | undefined }
    | { pathname: "/registration2"; query?: Query | undefined }
    | { pathname: "/registration3"; query?: Query | undefined }
    | { pathname: "/registration4"; query?: Query | undefined }
    | { pathname: "/registration5"; query?: Query | undefined }
    | { pathname: "/registration6"; query?: Query | undefined }
    | { pathname: "/settings"; query?: Query | undefined };

  type Query<Params = {}> = Params & {
    [key: string]: string | string[] | undefined;
  };

  type QueryForPathname = {
    [K in Route as K["pathname"]]: Exclude<K["query"], undefined>;
  };

  export type RoutedQuery<P extends Route["pathname"]> = QueryForPathname[P];

  export type Locale = undefined;

  /**
   * A typesafe utility function for generating paths in your application.
   *
   * route({ pathname: "/foos/[foo]", query: { foo: "bar" }}) will produce "/foos/bar".
   */
  export declare function route(r: Route): string;
}

// prettier-ignore
declare module "next/link" {
  import type { Route } from "nextjs-routes";
  import type { LinkProps as NextLinkProps } from "next/dist/client/link";
  import type { PropsWithChildren, MouseEventHandler } from "react";
  export * from "next/dist/client/link";

  type Query = { query?: { [key: string]: string | string[] | undefined } };
  type StaticRoute = Exclude<Route, { query: any }>["pathname"];

  export interface LinkProps<Href extends Route | Query = Route | Query>
    extends Omit<NextLinkProps, "href" | "locale"> {
    href: Href;
    locale?: false;
  }

  type LinkReactElement = DetailedReactHTMLElement<
    {
      onMouseEnter?: MouseEventHandler<Element> | undefined;
      onClick: MouseEventHandler;
      href?: string | undefined;
      ref?: any;
    },
    HTMLElement
  >;

  declare function Link(
    props: PropsWithChildren<LinkProps<Route>>
  ): LinkReactElement;
  declare function Link(
    props: PropsWithChildren<LinkProps<StaticRoute>>
  ): LinkReactElement;
  declare function Link(
    props: PropsWithChildren<LinkProps<Query>>
  ): LinkReactElement;

  export default Link;
}

// prettier-ignore
declare module "next/router" {
  import type { Locale, Route, RoutedQuery } from "nextjs-routes";
  import type { NextRouter as Router } from "next/dist/client/router";
  export * from "next/dist/client/router";
  export { default } from "next/dist/client/router";

  type NextTransitionOptions = NonNullable<Parameters<Router["push"]>[2]>;
  type StaticRoute = Exclude<Route, { query: any }>["pathname"];

  interface TransitionOptions extends Omit<NextTransitionOptions, "locale"> {
    locale?: false;
  };

  export interface NextRouter<P extends Route["pathname"] = Route["pathname"]>
    extends Omit<
      Router,
      | "push"
      | "replace"
      | "locale"
      | "locales"
      | "defaultLocale"
      | "domainLocales"
    > {
    defaultLocale?: undefined;
    domainLocales?: undefined;
    locale?: Locale;
    locales?: undefined;
    pathname: P;
    push(
      url: Route,
      as?: string,
      options?: TransitionOptions
    ): Promise<boolean>;
    push(
      url: StaticRoute,
      as?: string,
      options?: TransitionOptions
    ): Promise<boolean>;
    push(
      url: { query: { [key: string]: string | string[] | undefined } },
      as?: string,
      options?: TransitionOptions
    ): Promise<boolean>;
    query: RoutedQuery<P>;
    replace(
      url: Route,
      as?: string,
      options?: TransitionOptions
    ): Promise<boolean>;
    replace(
      url: StaticRoute,
      as?: string,
      options?: TransitionOptions
    ): Promise<boolean>;
    replace(
      url: { query: { [key: string]: string | string[] | undefined } },
      as?: string,
      options?: TransitionOptions
    ): Promise<boolean>;
    route: P;
  }

  export function useRouter<P extends Route["pathname"]>(): NextRouter<P>;
}
