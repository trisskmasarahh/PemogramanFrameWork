import { NextResponse } from "next/server";
import withAuth from "./middleware/withAuth";

export default withAuth(
    function middleware() {
        return NextResponse.next();
    },
    ["/profile"]
    );

    export const config = {
    matcher: ["/profile"],
    };