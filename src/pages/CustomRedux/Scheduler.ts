import SubscriptionService from "@wuchuheng/rxjs";

export default class Scheduler {
    // 声明一个共享会话的聊天室
    public static chatGroupObserve = new SubscriptionService<string>('');
}