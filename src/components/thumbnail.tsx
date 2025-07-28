import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { DialogTitle } from '@radix-ui/react-dialog';
import * as VisuallyHidden from '@radix-ui/react-visually-hidden';

interface ThumbnailProps {
  url: string | null | undefined;
}

export const Thumbnail = ({ url }: ThumbnailProps) => {
  if (!url) return null;

  return (
    <Dialog>
      <DialogTrigger>
        <div className="relative my-2 max-w-[360px] cursor-zoom-in overflow-hidden rounded-lg border">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={url} alt="Message image" className="size-full rounded-md object-cover" />
        </div>
      </DialogTrigger>

      {/* niche line me error thi */}
      <DialogContent className="max-w-[800px] border-none bg-transparent p-0 shadow-none">

      <VisuallyHidden.Root>
        <DialogTitle>Image Panel</DialogTitle>
      </VisuallyHidden.Root>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={url} alt="Message image" className="size-full rounded-md object-cover" />
      </DialogContent>
    </Dialog>
  );
};
