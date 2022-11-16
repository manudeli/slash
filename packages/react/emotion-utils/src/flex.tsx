/** @tossdocs-ignore */
/** @jsxImportSource @emotion/react */
import { css, SerializedStyles } from '@emotion/react';
import { ComponentType, CSSProperties, forwardRef, ReactElement, Ref } from 'react';
import type { AsProps, InferenceHTMLElement } from './types';
export interface FlexOptions {
  align?: CSSProperties['alignItems'];
  justify?: CSSProperties['justifyContent'];
  direction?: CSSProperties['flexDirection'];
}

export function flex(options: FlexOptions): SerializedStyles;
export function flex(
  align: CSSProperties['alignItems'],
  justify?: CSSProperties['justifyContent'],
  direction?: CSSProperties['flexDirection']
): SerializedStyles;
export function flex(
  alignOrFlexOptions: FlexOptions | CSSProperties['alignItems'],
  justify = 'flex-start',
  direction = 'row'
) {
  if (typeof alignOrFlexOptions === 'object') {
    const { align = 'stretch', direction = 'row', justify = 'flex-start' } = alignOrFlexOptions;

    return css`
      align-items: ${align};
      display: flex;
      flex-direction: ${direction};
      justify-content: ${justify};
    `;
  }

  return css`
    align-items: ${alignOrFlexOptions};
    display: flex;
    flex-direction: ${direction};
    justify-content: ${justify};
  `;
}

flex.center = (direction?: FlexOptions['direction']) => flex({ justify: 'center', align: 'center', direction });

interface FlexProps<T extends keyof JSX.IntrinsicElements = 'div'> extends AsProps<T>, FlexOptions {}

type FlexReturnType = <T extends keyof JSX.IntrinsicElements = 'div'>(
  props: FlexProps<T> & { ref?: Ref<InferenceHTMLElement<T>> }
) => ReactElement | null;

export const BaseFlex = forwardRef<HTMLElement, FlexProps>(function BaseFlex(props, ref) {
  const { align = 'stretch', as = 'div', direction = 'row', justify = 'flex-start', ...rest } = props;

  const Component = as as any;

  return <Component ref={ref} css={flex({ align, direction, justify })} {...rest} />;
}) as FlexReturnType;

type FlexType = typeof BaseFlex & {
  Center: ComponentType<FlexWithJustifyAlignProps>;
  CenterVertical: ComponentType<FlexWithJustifyProps>;
  CenterHorizontal: ComponentType<FlexWithJustifyProps>;
};

export const Flex = BaseFlex as FlexType;

type FlexWithJustifyAlignProps = Omit<FlexProps<keyof JSX.IntrinsicElements>, 'justify' | 'align'>;
type FlexWithJustifyProps = Omit<FlexProps<keyof JSX.IntrinsicElements>, 'justify'>;

Flex.Center = forwardRef<HTMLElement, FlexWithJustifyAlignProps>(function Center(props, ref) {
  return <BaseFlex align="center" justify="center" {...props} ref={ref} />;
});

Flex.CenterVertical = forwardRef<HTMLElement, FlexWithJustifyProps>(function CenterVertical(props, ref) {
  return <BaseFlex align="center" {...props} ref={ref} />;
});

Flex.CenterHorizontal = forwardRef<HTMLElement, FlexWithJustifyProps>(function CenterHorizontal(props, ref) {
  return <BaseFlex justify="center" {...props} ref={ref} />;
});
