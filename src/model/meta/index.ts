import type { IMeta } from "./index.type";

export class Meta {
  protected props: IMeta = {};

  constructor(data?: IMeta) {
    if (data) {
      this.props = data;
    }
  }

  getTotalItems(): number {
    return this.props?.totalItems || 0;
  }

  getItemCount(): number {
    return this.props?.itemCount || 0;
  }

  getItemsPerPage(): number {
    return this.props?.itemsPerPage || 0;
  }

  getTotalPages(): number {
    return this.props?.totalPages || 0;
  }

  getCurrentPage(): number {
    return this.props?.currentPage || 1;
  }

  /* --------------------------------- Custom --------------------------------- */

  getNextPage(): number {
    if (this.getTotalItems() > this.getCurrentPage() * this.getItemsPerPage()) {
      return this.getCurrentPage() + 1;
    }
    return 1;
  }
}
