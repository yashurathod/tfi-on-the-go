import { useState } from "react";
import BottomNav, { type TabId } from "@/components/BottomNav";
import BusMap from "@/components/BusMap";
import SearchScreen from "@/components/SearchScreen";
import FavoritesScreen from "@/components/FavoritesScreen";
import SettingsScreen from "@/components/SettingsScreen";

const Index = () => {
  const [activeTab, setActiveTab] = useState<TabId>("map");

  return (
    <div className="h-screen w-screen overflow-hidden bg-background">
      <div className="h-full pb-16">
        {activeTab === "map" && <BusMap />}
        {activeTab === "search" && <SearchScreen />}
        {activeTab === "favorites" && <FavoritesScreen />}
        {activeTab === "settings" && <SettingsScreen />}
      </div>
      <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
};

export default Index;
