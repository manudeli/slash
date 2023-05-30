/** @tossdocs-ignore */
import { NextRouter } from 'next/router';
import { useNextRouter } from './useNextRouter';

interface Options<TParsed, TName extends string> {
  parse?: (value: NextRouter['query'][TName]) => TParsed;
  suspense?: boolean;
}

export function useQueryParam(name: string): NextRouter['query'][string];
export function useQueryParam<TParsed, TName extends string = string>(
  name: TName,
  options: Options<TParsed, TName>
): TParsed;
export function useQueryParam<TParsed, TName extends string = string>(name: TName, options?: Options<TParsed, TName>) {
  const router = useNextRouter({ suspense: options?.suspense });

  const value = router.query[name];

  if (value == null || options?.parse == null) {
    return value;
  } else {
    return options.parse(value);
  }
}
