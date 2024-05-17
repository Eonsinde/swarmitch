"use client"
import React, { useState } from "react"
import { useRouter } from "next/navigation"
import qs from "query-string"
import { SearchIcon, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

const Search = () => {
    const router = useRouter();

    const [value, setValue] = useState<string>("");

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!value) return;

        const url = qs.stringifyUrl({
            url: "/search",
            query: { term: value },
        }, {
            skipEmptyString: true
        });

        router.push(url);
    }

    const onClear = () => {
        setValue("");
    }

    return (
        <form
            className="relative w-full lg:w-[400px] flex items-center"
            onSubmit={onSubmit}
        >
            <Input
                className="rounded-r-none focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0"
                value={value}
                onChange={e => setValue(e.target.value)}
                placeholder="Search"
            />
            {value && (
                <X
                    className="absolute top-2.5 right-14 h-5 w-5 text-muted-foreground cursor-pointer hover:opacity-75 transition"
                    onClick={onClear}
                />
            )}
            <Button
                className="bg-input rounded-l-none"
                type="submit"
                size="sm"
            >
                <SearchIcon className="h-5 w-5 text-muted-foreground" />
            </Button>
        </form>
    )
}
 
export default Search