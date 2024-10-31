import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
interface TableProps<TData> {
  data: TData[];
  columnsHeaders: {
    title: string;
    className: string;
  }[];
}

export const CustomBasicTable = <TData extends Record<string, any>>({
  data,
  columnsHeaders,
}: TableProps<TData>) => {
  return (
    <Table
      className="rounded-md border-border w-full h-10 overflow-clip relative"
      divClassname="max-h-[200px] overflow-y-scroll "
    >
      <TableHeader className="sticky rounded-none w-full  top-0 h-10 border-b-2 border-border bg-accent ">
        <TableRow>
          {columnsHeaders.map((columnHeader) => (
            <TableHead
              key={columnHeader.title}
              className={columnHeader.className}
            >
              {columnHeader.title}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((dataItem, index) => (
          <TableRow key={index}>
            {Object.keys(dataItem).map((key) => (
              <TableCell key={key}>{dataItem[key]}</TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

interface CustomBasicTableSkeletonProps {
  columnsCount?: number;
  rowsCount?: number;
  styles?: {
    table?: string;
    header?: string;
    headerCell?: string;
    row?: string;
    cell?: string;
    skeleton?: string;
  };
}

export const CustomBasicTableSkeleton: React.FC<
  CustomBasicTableSkeletonProps
> = ({ columnsCount = 4, rowsCount = 5, styles = {} }) => {
  const defaultStyles = {
    table: " border-border w-full h-10 overflow-clip relative rounded-none",
    header:
      "sticky rounded-none w-full top-0 h-10 border-b-2 border-border bg-accent ",
    headerCell: "h-10",
    row: "",
    cell: "h-10",
    skeleton: "h-4 w-full",
  };

  const mergedStyles = {
    table: cn(defaultStyles.table, styles.table),
    header: cn(defaultStyles.header, styles.header),
    headerCell: cn(defaultStyles.headerCell, styles.headerCell),
    row: cn(defaultStyles.row, styles.row),
    cell: cn(defaultStyles.cell, styles.cell),
    skeleton: cn(defaultStyles.skeleton, styles.skeleton),
  };

  return (
    <Table className={mergedStyles.table}>
      <TableHeader className={cn(`rounded-none`, mergedStyles.header)}>
        <TableRow>
          {Array.from({ length: columnsCount }).map((_, index) => (
            <TableHead key={index} className={mergedStyles.headerCell}>
              <Skeleton className={cn(mergedStyles.skeleton, "w-3/4")} />
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {Array.from({ length: rowsCount }).map((_, rowIndex) => (
          <TableRow key={rowIndex} className={mergedStyles.row}>
            {Array.from({ length: columnsCount }).map((_, cellIndex) => (
              <TableCell key={cellIndex} className={mergedStyles.cell}>
                <Skeleton className={mergedStyles.skeleton} />
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default CustomBasicTableSkeleton;
