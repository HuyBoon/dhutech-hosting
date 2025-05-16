import clientPromise from "./mongoConnect";
import bcrypt from "bcrypt";
import CredentialsProvider from "next-auth/providers/credentials";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import { NextAuthOptions } from "next-auth";
import type { Adapter } from "next-auth/adapters";
import { User } from "@/models/User";
import { connectMongoose } from "./mongoose";

export const authOptions: NextAuthOptions = {
    secret: process.env.NEXTAUTH_SECRET,
    adapter: MongoDBAdapter(clientPromise) as Adapter,
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: {
                    label: "Email",
                    type: "email",
                    placeholder: "test@example.com",
                },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    throw new Error("Email và mật khẩu là bắt buộc");
                }

                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(credentials.email)) {
                    throw new Error("Định dạng email không hợp lệ");
                }

                await connectMongoose();
                const user = await User.findOne({ email: credentials.email });

                if (!user) {
                    throw new Error("Email hoặc mật khẩu không đúng");
                }

                const passwordOk = await bcrypt.compare(
                    credentials.password,
                    user.password
                );
                if (!passwordOk) {
                    throw new Error("Email hoặc mật khẩu không đúng");
                }

                // Chỉ cho phép admin hoặc superAdmin
                if (!user.admin && !user.superAdmin) {
                    throw new Error("Bạn không có quyền truy cập Admin Dashboard");
                }

                return {
                    id: user._id.toString(),
                    email: user.email,
                    name: user.name,
                    admin: user.admin,
                    superAdmin: user.superAdmin,
                    avatar: user.avatar,
                };
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.admin = Boolean(user.admin);
                token.superAdmin = Boolean(user.superAdmin);
                token.avatar = user.avatar;
            }
            return token;
        },
        async session({ session, token }) {
            if (session?.user) {
                session.user.id = token.id as string;
                session.user.admin = Boolean(token.admin);
                session.user.superAdmin = Boolean(token.superAdmin);
                session.user.avatar = token.avatar as string;
            }
            return session;
        },
    },
    session: {
        strategy: "jwt",
        maxAge: 24 * 60 * 60, // 1 ngày
        updateAge: 60 * 60, // Cập nhật sau 1 giờ
    },
    pages: {
        signIn: "/admin/login",
    },
};