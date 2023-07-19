interface Vertical {
    showInNav: boolean;
    label: string;
    key?: string;
    entityType?: string;
    limit?: number;
}

export const verticals: Vertical[]= [
    {
      //universal vertical
      showInNav: true,
      label: "All",
    },
    {
      showInNav: true,
      label: "Files",
      key: "files",
      entityType: "ce_files"

    },
    // {
    //     //comment in to add additional vertical
    //     showInNav: true,
    //     label: "All"
    //   },
]
