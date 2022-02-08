import React, {ComponentType} from 'react';

type EmptyObject = Record<string, never>;

/**
 * Função HOC responsável por abstrair a declaração de componentes pai/filho.
 */
function withParent<ParentProps extends any, ChildProps = EmptyObject>(
  Parent: ComponentType<ParentProps>,
) {
  return (Child: ComponentType<ChildProps>) => {
    const Component = (props: Omit<ParentProps, 'children'> & ChildProps) => (
      <Parent {...(props as ParentProps)}>
        <Child {...(props as ChildProps)} />
      </Parent>
    );

    Component.displayName = `withParent(${
      Parent.displayName || Parent.name || 'Unknown'
    })`;

    return Component;
  };
}
export default withParent;
