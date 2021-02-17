// eslint-disable-next-line @typescript-eslint/ban-types
interface PropsWithChildren<T extends Record<any, any> = {}> extends T {
  children?: React.ReactNode;
}
