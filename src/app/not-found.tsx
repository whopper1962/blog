import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-[60vh] sm:min-h-[70vh] flex items-center justify-center px-4">
      <div className="w-full max-w-xl text-center bg-card/50 backdrop-blur-sm p-6 sm:p-8">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">Page not found</h1>
        <p className="mt-2 text-sm sm:text-base text-muted-foreground">
          入力されたURLが正しいかご確認ください。ページが移動または削除された可能性があります。
        </p>

        <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link href="/">
            <Button className="w-full sm:w-auto">ホームへ戻る</Button>
          </Link>
          <Link href="/articles">
            <Button variant="outline" className="w-full sm:w-auto">
              記事一覧へ
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
