import { Card, CardContent } from "@docbot/ui/components/card";
import React, { type ComponentProps } from "react";

interface ChatLayoutProps extends ComponentProps<"div"> {}

const ChatLayout = ({ children }: ChatLayoutProps) => {
  return (
    <Card className="w-full h-full max-w-3xl shadow-lg">
      <CardContent className="p-4 space-y-4">{children}</CardContent>
    </Card>
  );
};

export default ChatLayout;
