import { Card, CardContent } from "@algoroot/ui/components/card";
import React, { type ComponentProps } from "react";

interface ChatLayoutProps extends ComponentProps<"div"> {}

const ChatLayout = ({ children }: ChatLayoutProps) => {
  return (
    <Card className="w-full h-full max-w-3xl shadow-lg bg-background/20">
      <CardContent className="p-4 space-y-4">{children}</CardContent>
    </Card>
  );
};

export default ChatLayout;
