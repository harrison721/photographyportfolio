export interface FileData {
  url: string;
  name: string;
  size: number;
  lastModified: string;
}

export interface FolderData {
  name: string;
}

const BASE_URL = `https://elijahpollackportfolio.sfo3.cdn.digitaloceanspaces.com`;

/**
 * Fetches and parses the XML file listing from the DigitalOcean Space.
 * @returns A promise resolving to an object containing folders and files.
 */
export async function fetchData(): Promise<{
  folders: FolderData[];
  files: FileData[];
}> {
  const response = await fetch(BASE_URL);

  if (!response.ok) {
    console.error(`Failed to fetch XML: ${response.statusText}`);
    return { folders: [], files: [] };
  }

  const xmlText = await response.text();
  return parseXML(xmlText);
}

/**
 * Parses the XML file listing to separate folders and files.
 * @param xml The XML string returned by the API.
 * @returns An object containing arrays of folders and files.
 */
function parseXML(xml: string): { folders: FolderData[]; files: FileData[] } {
  const parser = new DOMParser();
  const xmlDoc = parser.parseFromString(xml, "application/xml");
  const contents = xmlDoc.getElementsByTagName("Contents");

  const folders: FolderData[] = [];
  const files: FileData[] = [];

  Array.from(contents).forEach((content) => {
    const key = content.getElementsByTagName("Key")[0]?.textContent || "";
    const size = parseInt(content.getElementsByTagName("Size")[0]?.textContent || "0", 10);
    const lastModified = content.getElementsByTagName("LastModified")[0]?.textContent || "";

    if (!key) {
      console.warn("Skipping empty key:", content);
      return;
    }

    // Separate folders and files
    if (key.endsWith("/")) {
      folders.push({ name: key });
    } else {
      files.push({
        url: `${BASE_URL}/${key}`,
        name: `${key}`,
        size,
        lastModified,
      });
    }
  });

  return { folders, files };
}
