import type { FC } from "react";
import { useState } from "react";
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
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
import { toast } from "sonner";
import { CheckCircle, CircleAlert } from "lucide-react";

interface SignupProps extends React.ComponentPropsWithoutRef<"div"> {
  onSwitch?: () => void;
}

const toastStyle = {
  backgroundColor: "rgba(0, 0, 0, 0.8)",
  color: "white",
  display: "flex",
  alignItems: "center",
  padding: "20px 30px",
  borderRadius: "12px",
  border: "none",
  boxShadow: "0 6px 8px rgba(0, 0, 0, 0.2)",
  fontSize: "18px",
  maxWidth: "900px",
};

const iconStyle = {
  marginRight: "20px", 
};

export const Signup: FC<SignupProps> = ({
  className,
  onSwitch = () => {},
  ...props
}) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (password !== confirmPassword) {
      toast.error("Passwords do not match!", {
        style: toastStyle,
        icon: <CircleAlert style={{ ...iconStyle, fill: "red" }} />,
      });
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/auth/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.message, {
          style: toastStyle,
          icon: <CircleAlert style={iconStyle} />,
        });
      } else {
        toast.success("Signup successful!", {
          style: toastStyle,
          icon: <CheckCircle style={{ ...iconStyle, fill: "green" }} />,
        });
        onSwitch();
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className={cn(
        "rounded-sm w-lg p-10 flex flex-col align-center justify-center bg-black bg-opacity-60 gap-1 min-h-[500px]",
        className
      )}
      {...props}
      style={{ backgroundColor: "rgba(0, 0, 0, 0.8)" }}
    >
      <Card className="text-white bg-black bg-opacity-90 shadow-lg border-0">
        <CardHeader className="text-start">
          <CardTitle className="text-4xl">Sign Up</CardTitle>
          <CardDescription>Create your account</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-6">
              {error && (
                <div className="text-red-500 text-sm text-center">{error}</div>
              )}
              <div className="grid gap-6">
                <div className="grid gap-2">
                  <Label
                    className="text-lg font-bold text-white"
                    htmlFor="username"
                  >
                    Username
                  </Label>
                  <Input
                    id="username"
                    type="text"
                    placeholder="johndoe"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    disabled={isLoading}
                    className="h-14 bg-transparent text-2xl placeholder:text-lg text-white placeholder-white border border-gray-500 focus:ring-2 focus:ring-red-600 rounded-sm"
                  />
                </div>
                <div className="grid gap-2">
                  <Label
                    className="text-lg font-bold text-white"
                    htmlFor="email"
                  >
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="email@example.com"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={isLoading}
                    className="h-14 bg-transparent placeholder:text-lg text-white placeholder-white border border-gray-500 focus:ring-2 focus:ring-red-600 rounded-sm"
                  />
                </div>
                <div className="grid gap-2">
                  <Label
                    className="text-lg font-bold text-white"
                    htmlFor="password"
                  >
                    Password
                  </Label>
                  <Input
                    id="password"
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={isLoading}
                    className="h-14 placeholder:text-lg bg-transparent text-white placeholder-gray-400 border border-gray-500 focus:ring-2 focus:ring-red-600 rounded-sm"
                  />
                </div>
                <div className="grid gap-2">
                  <Label
                    className="text-lg font-bold text-white"
                    htmlFor="confirmPassword"
                  >
                    Confirm Password
                  </Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    disabled={isLoading}
                    className="h-14 placeholder:text-lg bg-transparent text-white placeholder-gray-400 border border-gray-500 focus:ring-2 focus:ring-red-600 rounded-sm"
                  />
                </div>
                <Button
                  type="submit"
                  size="big"
                  className="w-full bg-red-600 hover:bg-red-700"
                  disabled={isLoading}
                >
                  {isLoading ? "Signing up..." : "Sign Up"}
                </Button>
              </div>
              <div className="text-center text-sm">
                Already have an account?{" "}
                <Button
                  onClick={onSwitch}
                  size="lg"
                  variant="transparent"
                  className="underline underline-offset-4 hover:text-red-500"
                  disabled={isLoading}
                >
                  Login
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
