import { NextResponse } from 'next/server';

const API_BASE = process.env.NEXT_API_PY;

export async function GET() {
    if (!API_BASE) {
        return NextResponse.json({ error: 'NEXT_API_PY is not defined' }, { status: 500 });
    }

    try {
        const [listRes, statsAllRes] = await Promise.all([
            fetch(`${API_BASE}/listweb`),
            fetch(`${API_BASE}/webstats?web_name=all`)
        ]);

        if (!listRes.ok || !statsAllRes.ok) {
            return NextResponse.json({ error: 'Failed to fetch data from Python API' }, { status: 502 });
        }

        const listweb = await listRes.json();
        const webstats = await statsAllRes.json();

        return NextResponse.json({ listweb, webstats });
    } catch (err: any) {
        return NextResponse.json({ error: 'Unexpected error', details: err.message }, { status: 500 });
    }
}
