"use client";

import { useState } from "react";
import {
  User,
  Bell,
  Shield,
  Settings as SettingsIcon,
  Lock,
  Database,
  Mail,
  Globe,
  Moon,
  Smartphone,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function SettingsPage() {
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [offerNotifications, setOfferNotifications] = useState(true);
  const [sessionNotifications, setSessionNotifications] = useState(true);
  const [profileVisibility, setProfileVisibility] = useState(true);
  const [showEmail, setShowEmail] = useState(false);

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Settings</h1>
        <p className="text-slate-400">
          Manage your account settings and preferences
        </p>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="account" className="space-y-6">
        <TabsList className="bg-slate-800/50 border border-slate-700">
          <TabsTrigger value="account" className="data-[state=active]:bg-emerald-500">
            <User className="h-4 w-4 mr-2" />
            Account
          </TabsTrigger>
          <TabsTrigger value="notifications" className="data-[state=active]:bg-emerald-500">
            <Bell className="h-4 w-4 mr-2" />
            Notifications
          </TabsTrigger>
          <TabsTrigger value="privacy" className="data-[state=active]:bg-emerald-500">
            <Shield className="h-4 w-4 mr-2" />
            Privacy
          </TabsTrigger>
          <TabsTrigger value="preferences" className="data-[state=active]:bg-emerald-500">
            <SettingsIcon className="h-4 w-4 mr-2" />
            Preferences
          </TabsTrigger>
          <TabsTrigger value="security" className="data-[state=active]:bg-emerald-500">
            <Lock className="h-4 w-4 mr-2" />
            Security
          </TabsTrigger>
          <TabsTrigger value="data" className="data-[state=active]:bg-emerald-500">
            <Database className="h-4 w-4 mr-2" />
            Data
          </TabsTrigger>
        </TabsList>

        {/* Account Settings */}
        <TabsContent value="account" className="space-y-6">
          <Card className="p-6 bg-slate-800/50 border-slate-700">
            <h2 className="text-xl font-semibold text-white mb-4">
              Account Information
            </h2>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-slate-300">
                  Email Address
                </Label>
                <Input
                  id="email"
                  type="email"
                  defaultValue="alex@example.com"
                  className="bg-slate-900/50 border-slate-700 text-white"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="name" className="text-slate-300">
                  Full Name
                </Label>
                <Input
                  id="name"
                  type="text"
                  defaultValue="Alex Johnson"
                  className="bg-slate-900/50 border-slate-700 text-white"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="bio" className="text-slate-300">
                  Bio
                </Label>
                <textarea
                  id="bio"
                  rows={4}
                  defaultValue="Full-stack developer with 5+ years of experience. Passionate about React, TypeScript, and performance optimization."
                  className="w-full px-3 py-2 bg-slate-900/50 border border-slate-700 rounded-md text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
              <Button className="bg-emerald-500 hover:bg-emerald-600">
                Save Changes
              </Button>
            </div>
          </Card>

          <Card className="p-6 bg-slate-800/50 border-slate-700">
            <h2 className="text-xl font-semibold text-white mb-4">
              Change Password
            </h2>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="current-password" className="text-slate-300">
                  Current Password
                </Label>
                <Input
                  id="current-password"
                  type="password"
                  className="bg-slate-900/50 border-slate-700 text-white"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="new-password" className="text-slate-300">
                  New Password
                </Label>
                <Input
                  id="new-password"
                  type="password"
                  className="bg-slate-900/50 border-slate-700 text-white"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirm-password" className="text-slate-300">
                  Confirm New Password
                </Label>
                <Input
                  id="confirm-password"
                  type="password"
                  className="bg-slate-900/50 border-slate-700 text-white"
                />
              </div>
              <Button className="bg-emerald-500 hover:bg-emerald-600">
                Update Password
              </Button>
            </div>
          </Card>
        </TabsContent>

        {/* Notification Settings */}
        <TabsContent value="notifications" className="space-y-6">
          <Card className="p-6 bg-slate-800/50 border-slate-700">
            <h2 className="text-xl font-semibold text-white mb-4">
              Notification Preferences
            </h2>
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-slate-400" />
                    <Label htmlFor="email-notifications" className="text-slate-300">
                      Email Notifications
                    </Label>
                  </div>
                  <p className="text-sm text-slate-400">
                    Receive notifications via email
                  </p>
                </div>
                <Switch
                  id="email-notifications"
                  checked={emailNotifications}
                  onCheckedChange={setEmailNotifications}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Smartphone className="h-4 w-4 text-slate-400" />
                    <Label htmlFor="push-notifications" className="text-slate-300">
                      Push Notifications
                    </Label>
                  </div>
                  <p className="text-sm text-slate-400">
                    Receive push notifications in browser
                  </p>
                </div>
                <Switch
                  id="push-notifications"
                  checked={pushNotifications}
                  onCheckedChange={setPushNotifications}
                />
              </div>

              <div className="border-t border-slate-700 pt-6">
                <h3 className="text-lg font-medium text-white mb-4">
                  Notification Types
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="offer-notifications" className="text-slate-300">
                        New Offers
                      </Label>
                      <p className="text-sm text-slate-400">
                        When someone sends you an offer
                      </p>
                    </div>
                    <Switch
                      id="offer-notifications"
                      checked={offerNotifications}
                      onCheckedChange={setOfferNotifications}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="session-notifications" className="text-slate-300">
                        Session Updates
                      </Label>
                      <p className="text-sm text-slate-400">
                        Reminders and session-related updates
                      </p>
                    </div>
                    <Switch
                      id="session-notifications"
                      checked={sessionNotifications}
                      onCheckedChange={setSessionNotifications}
                    />
                  </div>
                </div>
              </div>

              <Button className="bg-emerald-500 hover:bg-emerald-600">
                Save Preferences
              </Button>
            </div>
          </Card>
        </TabsContent>

        {/* Privacy Settings */}
        <TabsContent value="privacy" className="space-y-6">
          <Card className="p-6 bg-slate-800/50 border-slate-700">
            <h2 className="text-xl font-semibold text-white mb-4">
              Privacy Settings
            </h2>
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label htmlFor="profile-visibility" className="text-slate-300">
                    Public Profile
                  </Label>
                  <p className="text-sm text-slate-400">
                    Make your profile visible to other users
                  </p>
                </div>
                <Switch
                  id="profile-visibility"
                  checked={profileVisibility}
                  onCheckedChange={setProfileVisibility}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label htmlFor="show-email" className="text-slate-300">
                    Show Email on Profile
                  </Label>
                  <p className="text-sm text-slate-400">
                    Display your email address on your public profile
                  </p>
                </div>
                <Switch
                  id="show-email"
                  checked={showEmail}
                  onCheckedChange={setShowEmail}
                />
              </div>

              <Button className="bg-emerald-500 hover:bg-emerald-600">
                Save Privacy Settings
              </Button>
            </div>
          </Card>
        </TabsContent>

        {/* Preferences */}
        <TabsContent value="preferences" className="space-y-6">
          <Card className="p-6 bg-slate-800/50 border-slate-700">
            <h2 className="text-xl font-semibold text-white mb-4">
              General Preferences
            </h2>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="language" className="text-slate-300 flex items-center gap-2">
                  <Globe className="h-4 w-4" />
                  Language
                </Label>
                <Select defaultValue="en">
                  <SelectTrigger
                    id="language"
                    className="bg-slate-900/50 border-slate-700 text-white"
                  >
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 border-slate-700">
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="es">Español</SelectItem>
                    <SelectItem value="fr">Français</SelectItem>
                    <SelectItem value="de">Deutsch</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="timezone" className="text-slate-300">
                  Timezone
                </Label>
                <Select defaultValue="utc-5">
                  <SelectTrigger
                    id="timezone"
                    className="bg-slate-900/50 border-slate-700 text-white"
                  >
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 border-slate-700">
                    <SelectItem value="utc-8">Pacific Time (UTC-8)</SelectItem>
                    <SelectItem value="utc-7">Mountain Time (UTC-7)</SelectItem>
                    <SelectItem value="utc-6">Central Time (UTC-6)</SelectItem>
                    <SelectItem value="utc-5">Eastern Time (UTC-5)</SelectItem>
                    <SelectItem value="utc+0">UTC</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="theme" className="text-slate-300 flex items-center gap-2">
                  <Moon className="h-4 w-4" />
                  Theme
                </Label>
                <Select defaultValue="dark">
                  <SelectTrigger
                    id="theme"
                    className="bg-slate-900/50 border-slate-700 text-white"
                  >
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 border-slate-700">
                    <SelectItem value="dark">Dark</SelectItem>
                    <SelectItem value="light">Light</SelectItem>
                    <SelectItem value="system">System</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button className="bg-emerald-500 hover:bg-emerald-600">
                Save Preferences
              </Button>
            </div>
          </Card>
        </TabsContent>

        {/* Security */}
        <TabsContent value="security" className="space-y-6">
          <Card className="p-6 bg-slate-800/50 border-slate-700">
            <h2 className="text-xl font-semibold text-white mb-4">
              Security Options
            </h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-white mb-2">
                  Two-Factor Authentication
                </h3>
                <p className="text-sm text-slate-400 mb-4">
                  Add an extra layer of security to your account
                </p>
                <Button variant="outline" className="border-slate-700 text-slate-300 hover:bg-slate-800">
                  Enable 2FA
                </Button>
              </div>

              <div className="border-t border-slate-700 pt-6">
                <h3 className="text-lg font-medium text-white mb-4">
                  Active Sessions
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-slate-900/50 border border-slate-700 rounded-md">
                    <div>
                      <p className="text-sm font-medium text-white">
                        Current Session
                      </p>
                      <p className="text-xs text-slate-400">
                        Windows • Chrome • Last active: Now
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      disabled
                      className="text-emerald-400"
                    >
                      Active
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>

        {/* Data Management */}
        <TabsContent value="data" className="space-y-6">
          <Card className="p-6 bg-slate-800/50 border-slate-700">
            <h2 className="text-xl font-semibold text-white mb-4">
              Data Management
            </h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-white mb-2">
                  Export Your Data
                </h3>
                <p className="text-sm text-slate-400 mb-4">
                  Download a copy of your account data
                </p>
                <Button
                  variant="outline"
                  className="border-slate-700 text-slate-300 hover:bg-slate-800"
                >
                  Request Data Export
                </Button>
              </div>

              <div className="border-t border-slate-700 pt-6">
                <h3 className="text-lg font-medium text-red-400 mb-2">
                  Danger Zone
                </h3>
                <p className="text-sm text-slate-400 mb-4">
                  Once you delete your account, there is no going back. Please be certain.
                </p>
                <Button
                  variant="outline"
                  className="border-red-500/20 text-red-400 hover:bg-red-500/10"
                >
                  Delete Account
                </Button>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
