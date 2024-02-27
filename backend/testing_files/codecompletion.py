def insertionSort(arr):
    # Get the length of the array
    n = len(arr)

    # If the array has 0 or 1 element, it is already sorted, so return
    if n <= 1:
        return

    # Iterate over the array starting from the second element
    for i in range(1, n):
        # Store the current element as the key to be inserted in the right position
        key = arr[i]

        # Initialize an index to traverse the sorted part of the array
        j = i - 1
