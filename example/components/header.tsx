import Link from "next/link"

export function Header() {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <Link href="/" passHref>
                    <a className="navbar-brand">co-media example</a>
                </Link>
            </div>
        </nav>
    )
}
