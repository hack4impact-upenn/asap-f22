import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import HtmlMapper from 'react-html-map';

interface HTMLMapperProps {
  text: string;
}

function HTMLMapper(props: HTMLMapperProps) {
  const { text } = props;
  return (
    <HtmlMapper
      html={text}
      // eslint-disable-next-line react/no-children-prop
      decodeEntities={undefined}
    >
      {{
        p: null,
        // eslint-disable-next-line react/jsx-no-undef, react/jsx-props-no-spreading, react/no-unstable-nested-components
        a: ({ href, children, ...rest }: any) => (
          // eslint-disable-next-line react/jsx-props-no-spreading
          <a href={href || ''} {...rest}>
            {children}
          </a>
        ),
        // eslint-disable-next-line react/jsx-props-no-spreading, react/no-unstable-nested-components
        ul: ({ children, ...rest }: any) => (
          // eslint-disable-next-line react/jsx-props-no-spreading
          <ul {...rest}>{children}</ul>
        ),
        // eslint-disable-next-line react/jsx-props-no-spreading, react/no-unstable-nested-components
        li: ({ children, ...rest }: any) => (
          // eslint-disable-next-line react/jsx-props-no-spreading
          <li {...rest}>{children}</li>
        ),
      }}
    </HtmlMapper>
  );
}

export default HTMLMapper;
