"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Bell, Check } from "lucide-react";
import {
  useNotifications,
  useDismissNotification,
  dismissNotification,
} from "@/features/notifications";
import type { NotificationResponse } from "@/lib/api/generated/models";
import { formatDate } from "@/lib/format";
import styles from "./NotificationBell.module.css";

function resolveHref(notification: NotificationResponse): string | undefined {
  if (notification.linkId === undefined) return undefined;
  switch (notification.linkType) {
    case "LISTING":
      return `/listings/${notification.linkId}`;
    case "USER":
      return `/profile/${notification.linkId}`;
    default:
      return undefined;
  }
}

export default function NotificationBell() {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const { data: notifications = [], mutate, isLoading } = useNotifications();
  const unread = notifications.filter((notification) => !notification.dismissed);

  useEffect(() => {
    if (!open) return;

    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  async function handleMarkAllRead() {
    await Promise.all(unread.map((notification) => dismissNotification(notification.id as number)));
    mutate();
  }

  return (
    <div className={styles.wrapper} ref={wrapperRef}>
      <button
        type="button"
        className={styles.bellButton}
        aria-label={unread.length > 0 ? `Notifications, ${unread.length} unread` : "Notifications"}
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
      >
        <Bell aria-hidden="true" />
        {unread.length > 0 && (
          <span className={styles.badge}>{unread.length > 9 ? "9+" : unread.length}</span>
        )}
      </button>

      {open && (
        <div className={styles.panel}>
          <div className={styles.panelHeader}>
            <span>Notifications</span>
            {unread.length > 0 && (
              <button type="button" className={styles.markAllButton} onClick={handleMarkAllRead}>
                Mark all as read
              </button>
            )}
          </div>

          {!isLoading && unread.length === 0 ? (
            <p className={styles.empty}>No notifications yet.</p>
          ) : (
            <ul className={styles.list}>
              {unread.map((notification) => (
                <NotificationRow
                  key={notification.id}
                  notification={notification}
                  onDismissed={() => mutate()}
                  onNavigate={() => setOpen(false)}
                />
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}

function NotificationRow({
  notification,
  onDismissed,
  onNavigate,
}: {
  notification: NotificationResponse;
  onDismissed: () => void;
  onNavigate: () => void;
}) {
  const dismiss = useDismissNotification(notification.id as number);
  const href = resolveHref(notification);

  async function handleDismiss() {
    try {
      await dismiss.trigger();
      onDismissed();
    } catch {
    }
  }

  function handleFollow() {
    dismiss.trigger().then(onDismissed).catch(() => undefined);
    onNavigate();
  }

  const content = (
    <div className={styles.itemContent}>
      <p className={styles.itemMessage}>{notification.message}</p>
      {notification.createdAt && (
        <span className={styles.itemDate}>{formatDate(notification.createdAt)}</span>
      )}
    </div>
  );

  return (
    <li className={styles.item}>
      {href ? (
        <Link href={href} className={styles.itemLink} onClick={handleFollow}>
          {content}
        </Link>
      ) : (
        content
      )}
      <button
        type="button"
        className={styles.dismissButton}
        onClick={handleDismiss}
        disabled={dismiss.isMutating}
        aria-label="Mark as read"
      >
        <Check aria-hidden="true" />
      </button>
    </li>
  );
}
