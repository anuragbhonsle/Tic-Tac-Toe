
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Settings, Sun, Moon } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { useTheme } from "@/contexts/ThemeContext";

interface PlayerSettingsProps {
  playerNames: { X: string; O: string };
  onSaveNames: (names: { X: string; O: string }) => void;
}

const PlayerSettings = ({ playerNames, onSaveNames }: PlayerSettingsProps) => {
  const [names, setNames] = useState(playerNames);
  const { theme, toggleTheme } = useTheme();

  const handleSave = () => {
    onSaveNames(names);
  };

  return (
    <div className="absolute top-4 right-4 flex items-center space-x-2">
      <div className="flex items-center gap-2">
        <Sun className="h-4 w-4 text-zinc-400" />
        <Switch checked={theme === 'light'} onCheckedChange={toggleTheme} />
        <Moon className="h-4 w-4 text-zinc-400" />
      </div>
      <Dialog>
        <DialogTrigger asChild>
          <Button 
            variant="outline" 
            size="icon" 
            className="bg-zinc-800/80 hover:bg-zinc-700/80 border-zinc-700"
          >
            <Settings className="h-4 w-4" />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md bg-zinc-900/95 border-zinc-800">
          <DialogHeader>
            <DialogTitle className="text-white">Player Names</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Input
                placeholder="Player X Name"
                value={names.X}
                onChange={(e) => setNames((prev) => ({ ...prev, X: e.target.value }))}
                className="bg-zinc-800 border-zinc-700 text-white"
              />
            </div>
            <div className="space-y-2">
              <Input
                placeholder="Player O Name"
                value={names.O}
                onChange={(e) => setNames((prev) => ({ ...prev, O: e.target.value }))}
                className="bg-zinc-800 border-zinc-700 text-white"
              />
            </div>
            <Button onClick={handleSave} className="w-full bg-white/10 hover:bg-white/20 text-white">
              Save Changes
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PlayerSettings;

