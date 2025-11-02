import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Book, FileText } from "lucide-react"

interface SearchResult {
  id: string
  title: string
  type: "course" | "topic"
  path: string
  excerpt?: string
}

interface SearchResultsProps {
  results: SearchResult[]
  isLoading: boolean
  query: string
}

export function SearchResults({ results, isLoading, query }: SearchResultsProps) {
  return (
    <Card className="absolute top-full mt-1 w-full z-50 max-h-[400px] overflow-auto">
      <CardContent className="p-2">
        {isLoading ? (
          <div className="space-y-2">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="flex items-start gap-2 p-2">
                <Skeleton className="h-5 w-5 rounded-full" />
                <div className="space-y-1 flex-1">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-3 w-4/5" />
                </div>
              </div>
            ))}
          </div>
        ) : results.length > 0 ? (
          <div className="space-y-1">
            {results.map((result) => (
              <Link
                key={result.id}
                href={result.path}
                className="flex items-start gap-2 p-2 hover:bg-muted rounded-md transition-colors"
              >
                {result.type === "course" ? (
                  <Book className="h-5 w-5 flex-shrink-0 mt-0.5" />
                ) : (
                  <FileText className="h-5 w-5 flex-shrink-0 mt-0.5" />
                )}
                <div>
                  <div className="font-medium">{result.title}</div>
                  {result.excerpt && <p className="text-xs text-muted-foreground line-clamp-1">{result.excerpt}</p>}
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="p-2 text-center text-sm text-muted-foreground">
            {query ? `No results found for "${query}"` : "Start typing to search"}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
