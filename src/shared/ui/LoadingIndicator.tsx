import { ChevronDown, Loader } from "lucide-react";

export const RenderLoader = ({ className }: { className: string }) => (
  <div className={className}>
    <Loader size={21} className="animate-spin mb-1 font-extrabold" />
  </div>
);

export const RenderLoadingIndicator = ({
  isFetchingNextPage,
  fetchNextPage,
}: {
  isFetchingNextPage: boolean;
  fetchNextPage?: any;
}) => (
  <>
    <ChevronDown
      size={16}
      className="text-center w-full cursor-pointer"
      onClick={() => {
        if (fetchNextPage) fetchNextPage();
      }}
    />
    {isFetchingNextPage && (
      <div className="fixed top-0 left-0 bottom-0 h-full w-full flex justify-center items-center backdrop-blur-[2px] ">
        <RenderLoader className="fixed bottom-2 flex justify-center text-center right-0 w-full z-10" />
      </div>
    )}
  </>
);
