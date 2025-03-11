"use client";

import {
  type ReactNode,
  createContext as _createContext,
  useContext as _useContext,
} from "react";

export type CreateContextReturn<T> = [
  React.FC<{ children: ReactNode; value?: T }>,
  // React.Provider<T>,
  () => T,
  React.Context<T>,
];

export const createContext = <T, TParams = undefined>(
  useHook: (params?: TParams) => T,
  initialProps?: TParams
) => {
  const context = _createContext({} as T);

  const useContext = () => {
    const ctx = _useContext(context);
    if (!ctx) {
      throw new Error("useContext must be used within a Provider");
    }
    return ctx;
  };

  const Provider = ({
    children,
    params,
  }: {
    children: ReactNode;
    params: TParams;
  }) => {
    const value = useHook(params || initialProps);
    return <context.Provider value={value}>{children}</context.Provider>;
  };

  return [Provider, useContext, context] as unknown as CreateContextReturn<T>;
};
