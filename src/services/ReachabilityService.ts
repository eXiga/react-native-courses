import { NetInfo } from "react-native";

export interface IReachabilityService {
  isConnected(success: () => void, failure: () => void): void;
}

export class ReachabilityService implements IReachabilityService {
  isConnected(success: () => void, failure: () => void): void {
    NetInfo.isConnected.fetch().then((isConnected) => {
      isConnected ? success() : failure();
    });
  }
}