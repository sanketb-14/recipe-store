import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import { getGuest, createGuest } from "@/app/lib/data-service";

const authConfig = {
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "Email" },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Password",
        },
      },
      async authorize(credentials) {
        const { email, password } = credentials;
        // console.log("Attempting to authorize:", email);
        if (!email || !password) {
          throw new Error("Email and password are required");
        }
        try {
          const user = await getGuest(credentials);
          
          if (!user) {
            return null;
          }
          return {
            id: user.data.user.id,
            email: user.data.user.email,
            name: user.data.user.username, // Use username as name
            image: user.data.user.profilePic,
            password,
            accessToken: user.token, // Store the JWT token
          };
        } catch (error) {
          console.error("Authorization error:", error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    authorized({ auth, request }) {
      return !!auth?.user;
    },
    async signIn({ user, account, profile }) {
    

      try {
        const existingGuest = await getGuest({
          email: user.email,
          password: user.password || user.email,
          provider: account.provider,
          profilePic:user.image || user.profilePic ,
        });
       

        if (!existingGuest) {
         
          await createGuest(newUser);
        }
        
        user.existingGuest = existingGuest
        return true
      } catch (error) {
        
        return false;
      }
    },
    // async session({ session, user }) {
    //   const guest = await getGuest(session.user);
    //   session.user.guestId = guest.id;
    //   return session;
    // },
    async jwt({ token, user, account }) {
      if (user?.existingGuest) {
        token.existingGuest = user.existingGuest
      
      }
      return token;
    },
    async session({ session, token }) {
     
      if (token.existingGuest) {
        
        session.user = {
          ...session.user,
          ...token.existingGuest.data.user
        }
        session.accessToken = token.existingGuest.token;
      }
      return session;
    },
  
  },
  pages: {
    signIn: "/login",
  },
};

export const {
  auth,
  signIn,
  signOut,
  handlers: { GET, POST },
} = NextAuth(authConfig);
