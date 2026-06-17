import { Bell, ChevronDown, Menu, Search } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { getInitials } from "@/lib/utils";
interface HeaderProps {
  onMenuClick: () => void;
}

export function Header({ onMenuClick }: HeaderProps) {
  //Mock user
  const user = {
    name: "Supun Yasantha",
    email: "supun@gmail.com",
    role: "Project Manager",
    avatarUrl: null,
  };

  return (
    <header className="sticky top-0 z-40 flex h-16 items-center gap-4 border-b bg-white px-4 shadow-sm lg:px-6">
      <Button
        variant="ghost"
        size="icon"
        className="lg:hidden"
        onClick={onMenuClick}
      >
        <Menu className="h-5 w-5" />
        <span className="sr-only">Toggle menu</span>
      </Button>

      <div className="flex-1 lg:flex-initial lg:w-96">
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-400" />
          <Input
            placeholder="Search projects, materials..."
            className="pl-9 bg-slate-50 border-slate-200 focus-visible:ring-orange-500"
          />
        </div>
      </div>

      <div className="flex items-center gap-3 ml-auto">
        <Button variant="ghost" size="icon" className="relative text-slate-500">
          <Bell className="h-5 w-5" />
          <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-orange-500 text-[10px] font-medium text-white">
            3
          </span>
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="flex items-center gap-2 px-2 hover:bg-slate-100"
            >
              <Avatar className="h-8 w-8">
                <AvatarImage src={user.avatarUrl || ""} alt={user.name} />
                <AvatarFallback className="bg-orange-100 text-orange-600 text-sm font-medium">
                  {getInitials(user.name)}
                </AvatarFallback>
              </Avatar>
              <div className="hidden lg:flex flex-col items-start text-sm">
                <span className="font-medium text-slate-700">{user.name}</span>
                <span className="text-xs text-slate-500">{user.role}</span>
              </div>
              <ChevronDown className="h-4 w-4 text-slate-400 hidden lg:black" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>profile</DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-red-600">Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
