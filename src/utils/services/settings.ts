import api from "@/context/AxiosContext";

interface SettingApiProps {
  data: {
    image?: any;
    name?: string;
  };
  onSuccess(): void;
}
export const settingsApi = async (props: SettingApiProps) => {
  const { data, onSuccess } = props;
  try {
    await api.post("/settings", data);
    onSuccess();
  } catch (err) {
    return err;
  }
};
