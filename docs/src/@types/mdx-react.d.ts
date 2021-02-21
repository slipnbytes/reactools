declare module '@mdx-js/react' {
  import type {
    Context,
    ReactElement,
    createElement,
    ComponentType,
    FunctionComponent,
  } from 'react';

  /**
   * Mapping of names for JSX components to React components
   */
  export interface ComponentDictionary {
    [name: string]: ComponentType<any>;
  }

  /**
   * Prop type that includes a component dictionary
   */
  export interface ComponentsProp {
    /**
     * Mapping of names for JSX components to React components
     */
    components?: ComponentDictionary;
    /**
     * Turn off outer component context
     *
     * @defaultValue false
     */
    disableParentContext?: boolean;
  }

  /**
   * Direct access to the MDX React Context
   */
  export const MDXContext: Context<ComponentsProp>;

  /**
   * Provider for MDX context
   */
  export const MDXProvider: FunctionComponent<ComponentsProp>;

  /**
   * Gets components from the MDX Context
   *
   * @param components additional components to include
   * @returns all components from context with overrides from components parameter
   */
  export function useMDXComponents(
    components: ComponentDictionary | (() => ComponentDictionary),
  ): ComponentDictionary;

  /**
   * High order component that passes components prop to child
   *
   * @param child Component being wrapped
   */
  export function withMDXComponents(
    child: ComponentType<ComponentsProp>,
  ): ReactElement | null;

  /**
   * React createElement function wrapped with handler for MDX content
   */
  export const mdx: typeof createElement;
}
