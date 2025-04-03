import type { FC } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { toast } from "sonner";
import { CheckCircle } from "lucide-react";
import { CircleAlert } from "lucide-react";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

interface LoginProps extends React.ComponentPropsWithoutRef<"div"> {
  onSwitch?: () => void;
}

export const Login: FC<LoginProps> = ({
  className,
  onSwitch = () => {},
  ...props
}) => {
  const [identifier, setIdentifier] = useState(""); // Can be username or email
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ identifier, password }),
      });

      const data = await response.json();

      if (!response.ok || !data.token) {
        // If response is not okay or there's no token, show error
        toast.error("Login failed. Please check your credentials.", {
          style: {
            backgroundColor: "rgba(0, 0, 0, 0.8)", // Black with reduced opacity
            color: "white", 
            display: "flex", 
            alignItems: "center", 
            padding: "12px 20px", 
            borderRadius: "8px", 
            border:'none',
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          },
          icon: <CircleAlert style={{ marginRight: "20px", fill: "red" }} />, // White CircleAlert icon from Lucide React
        });
        return;
      }

      // If login is successful, save the token and show success toast
      localStorage.setItem("token", data.token);
      console.log("Login successful:", data);
      toast.success("Login successful!", {
        style: {
            backgroundColor: "rgba(0, 0, 0, 0.8)", // Black with reduced opacity
            color: "white", 
            display: "flex", 
            alignItems: "center", 
            padding: "12px 20px", 
            borderRadius: "8px", 
            border:'none',
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        },
        icon: <CheckCircle style={{ marginRight: "20px", fill: "green" }} />,
      });
    } catch (err) {
      // Catch unexpected errors
      toast.error(err instanceof Error ? err.message : "An error occurred", {
        style: {
            backgroundColor: "rgba(0, 0, 0, 0.8)", // Black with reduced opacity
            color: "white", 
            display: "flex", 
            alignItems: "center", 
            padding: "12px 20px", 
            borderRadius: "8px", 
            border:'none',
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        },
        icon: <CircleAlert style={{ marginRight: "30px" }} />,
      });
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div
      className={cn(" w-lg p-14 flex flex-col rounded-sm align-center justify-center bg-black bg-opacity-60 gap-6 min-h-[500px]",
        className
      )}
      {...props}
      style={{ backgroundColor: "rgba(0, 0, 0, 0.8)" }} // explicitly set black with opacity
    >
      {" "}
      <Card className="text-white bg-black bg-opacity-90 shadow-lg border-0">
        <CardHeader className="text-start">
          <CardTitle className="text-5xl">Log In</CardTitle>
          <CardDescription>Login with your username or email</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-6">
              <div className="grid gap-10">
                <div className="grid gap-2">
                  <Label
                    className="text-lg font-bold text-white"
                    htmlFor="identifier"
                  >
                    Username or Email
                  </Label>
                  <Input
                    id="identifier"
                    type="text"
                    placeholder="username or email@example.com"
                    required
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                    disabled={isLoading}
                    className="h-16 bg-transparent placeholder:text-lg text-white placeholder-white border border-gray-500 focus:ring-2 focus:ring-red-600 rounded-sm"
                  />
                </div>
                <div className="grid gap-2">
                  <div className="flex items-center">
                    <Label
                      className="text-lg font-bold text-white"
                      htmlFor="password"
                    >
                      Password
                    </Label>
                    <a
                      href="#"
                      className="ml-auto text-sm text-gray-400 underline-offset-4 hover:underline"
                    >
                      Forgot your password?
                    </a>
                  </div>
                  <Input
                    id="password"
                    type="password"
                    required
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={isLoading}
                    className="h-16 placeholder:text-lg bg-transparent text-white placeholder-gray-400 border border-gray-500 focus:ring-2 focus:ring-red-600 rounded-sm"
                  />
                </div>
                <Button
                  type="submit"
                  size='big'
                  className="w-full bg-red-600 hover:bg-red-700"
                  disabled={isLoading}
                >
                  {isLoading ? "Logging in..." : "Login"}
                </Button>
              </div>
              <div className="text-center text-sm">
                Don't have an account?{" "}
                <Button
                  size='lg'
                  onClick={onSwitch}
                  variant='transparent'
                  className="underline underline-offset-4  hover:text-red-500"
                  disabled={isLoading}
                >
                  Sign up
                </Button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
      <div className="text-center text-xs text-gray-400 [&_a]:underline [&_a]:underline-offset-4 [&_a]:hover:text-red-600">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </div>
    </div>
  );
};
