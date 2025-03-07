import { Button } from "@docbot/ui/components/button";
import { Input } from "@docbot/ui/components/input";
import { Loader2 } from "lucide-react";
import type { ComponentProps } from "react";

interface ChatInputProps extends ComponentProps<"input"> {
  isLoading: boolean;
}
const ChatInput = ({ isLoading }: ChatInputProps) => {
  return (
    <div className="flex items-center gap-2">
      <Input
        name="message"
        placeholder="질문을 입력하세요..."
        className="flex-1"
      />
      <Button type="submit" disabled={isLoading}>
        {isLoading ? <Loader2 className="animate-spin" /> : "보내기"}
      </Button>
    </div>
  );
};
export default ChatInput;
